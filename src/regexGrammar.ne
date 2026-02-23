@preprocessor typescript

@{%
export interface Op {
    op: string
}
%}

Regex -> Conjunction ("|" Conjunction):* {% function(data): Op {
    let conjunctions = [data[0]];
    for (const child of data[1]) {
        conjunctions.push(child[1]);
    }
    return {
        op: "disjunction",
        children: conjunctions
    };
} %}

Conjunction -> Term:+ {% function(data): Op {
    const obj = {
        op: "concatenation",
        children: data[0]
    };
    return obj;
} %}

Term -> SimpleTerm ("*" | "+" | "?" | Quantifier):? {% function(data): Op|string {
    const obj = {
        op: "term",
        object: data[0],
        quantifier: data[1]
    }
    if (obj.quantifier === null) return data[0];
    obj.quantifier = obj.quantifier[0];

    if (typeof obj.quantifier === 'string') {
        const quant = obj.quantifier;
        obj.quantifier = {
            op: "quantifier",
            min: (quant === '+') ? 1 : 0,
            max: (quant === '?') ? 1 : null
        };
    }

    return obj;
} %}

SimpleTerm -> CharGroup {% id %} | "(" Regex ")" {% function(data): Op {
    return data[1];
} %}

Quantifier -> "{" (Int| Int "," | "," Int | Int "," Int) "}" {% function(data): Op|string {
    const quantifying = data[1];
    const obj = {
        op: "quantifier",
        min: 0,
        max: null
    };

    // specifying object min max
    if (quantifying.length === 1) {
        obj.min = quantifying[0];
        obj.max = quantifying[0];
    } else if (quantifying.length === 3) {
        obj.min = quantifying[0];
        obj.max = quantifying[2];
    } else {
        if (quantifying[0] === ",") 
            obj.max = quantifying[1];
        else 
            obj.min = quantifying[0];
    }

    return obj;
} %}

Int -> [0-9]:+ {% function(data): Number { 
    return Number(data[0].join("")) 
} %}

CharGroup -> Char {% id %}
    | "[" "^":? (Char "-" Char | Char):+ "]" {% function(data): Op {
            let captureGroups = [];
            const notting: boolean = data[1] === "^";
            for (const group of data[notting ? 2 : 1]) {
                captureGroups.push({
                    first: group[0],
                    last: group.length === 1 ? group[0] : group[2]
                });
            }
            const obj = {
                op: "charGroup",
                data: captureGroups,
                not: notting
            }
            return obj;
        } %}

Char -> [0-9A-Za-z@] {% function(data): string { 
            return data.flat(Infinity)[0];
        } %}
    | "." {% (data) => "any" %}
    | "\\" ("[" | "]" | "." | "(" | ")" | "n" | "^") {% function(data): Op {
            return {
                op: 'escapeChar',
                char: data.flat(Infinity)[1]
            };
        } %}
