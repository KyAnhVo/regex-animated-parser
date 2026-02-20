@preprocessor typescript

Regex -> Conjunction ("|" Conjunction):* {% function(data) {
    if (data.length === 1) return data[0];
    let conjunctions = [data[0]];
    for (const child of data[1]) {
        conjunctions.push(child[1]);
    }
    return {
        op: "disjunction",
        children: conjunctions
    };
} %}

Conjunction -> Term:+ {% (data) => {
    if (data.length === 1) return data[0];
    return {
        op: "concatenation",
        children: data
    };
} %}
Term -> SimpleTerm ("*" | "+" | "?" | Quantifier):? {% function(data) {
    if (data[1] === null) return data[0];
    return {
        op: "term",
        object: data[0],
        quantifier: data[1]
    }  
} %}

SimpleTerm -> Char | "(" Regex ")" {% (data) => {
    return data;
} %}

Quantifier -> "{" (Int | Int "," | "," Int | Int "," Int) "}" 

Int -> [0-9]:+ {% (data) => Number(data.join()) %}
Char -> [0-9A-Za-z@] {% id %}
