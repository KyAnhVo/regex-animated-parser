// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }

export interface Op {
    op: string
}

interface NearleyToken {
  value: any;
  [key: string]: any;
};

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: never) => string;
  has: (tokenType: string) => boolean;
};

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
};

type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
};

const grammar: Grammar = {
  Lexer: undefined,
  ParserRules: [
    {"name": "Regex$ebnf$1", "symbols": []},
    {"name": "Regex$ebnf$1$subexpression$1", "symbols": [{"literal":"|"}, "Conjunction"]},
    {"name": "Regex$ebnf$1", "symbols": ["Regex$ebnf$1", "Regex$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Regex", "symbols": ["Conjunction", "Regex$ebnf$1"], "postprocess":  function(data): Op {
            let conjunctions = [data[0]];
            for (const child of data[1]) {
                conjunctions.push(child[1]);
            }
            return {
                op: "disjunction",
                children: conjunctions
            };
        } },
    {"name": "Conjunction$ebnf$1", "symbols": ["Term"]},
    {"name": "Conjunction$ebnf$1", "symbols": ["Conjunction$ebnf$1", "Term"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Conjunction", "symbols": ["Conjunction$ebnf$1"], "postprocess":  function(data): Op {
            const obj = {
                op: "concatenation",
                children: data[0]
            };
            return obj;
        } },
    {"name": "Term$ebnf$1$subexpression$1", "symbols": [{"literal":"*"}]},
    {"name": "Term$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "Term$ebnf$1$subexpression$1", "symbols": [{"literal":"?"}]},
    {"name": "Term$ebnf$1$subexpression$1", "symbols": ["Quantifier"]},
    {"name": "Term$ebnf$1", "symbols": ["Term$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "Term$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "Term", "symbols": ["SimpleTerm", "Term$ebnf$1"], "postprocess":  function(data): Op|string {
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
        } },
    {"name": "SimpleTerm", "symbols": ["CharGroup"], "postprocess": id},
    {"name": "SimpleTerm", "symbols": [{"literal":"("}, "Regex", {"literal":")"}], "postprocess":  function(data): Op {
            return data[1];
        } },
    {"name": "Quantifier$subexpression$1", "symbols": ["Int"]},
    {"name": "Quantifier$subexpression$1", "symbols": ["Int", {"literal":","}]},
    {"name": "Quantifier$subexpression$1", "symbols": [{"literal":","}, "Int"]},
    {"name": "Quantifier$subexpression$1", "symbols": ["Int", {"literal":","}, "Int"]},
    {"name": "Quantifier", "symbols": [{"literal":"{"}, "Quantifier$subexpression$1", {"literal":"}"}], "postprocess":  function(data): Op|string {
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
        } },
    {"name": "Int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "Int$ebnf$1", "symbols": ["Int$ebnf$1", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Int", "symbols": ["Int$ebnf$1"], "postprocess":  function(data): Number { 
            return Number(data[0].join("")) 
        } },
    {"name": "CharGroup", "symbols": ["Char"], "postprocess": id},
    {"name": "CharGroup$ebnf$1", "symbols": [{"literal":"^"}], "postprocess": id},
    {"name": "CharGroup$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "CharGroup$ebnf$2$subexpression$1", "symbols": ["Char", {"literal":"-"}, "Char"]},
    {"name": "CharGroup$ebnf$2$subexpression$1", "symbols": ["Char"]},
    {"name": "CharGroup$ebnf$2", "symbols": ["CharGroup$ebnf$2$subexpression$1"]},
    {"name": "CharGroup$ebnf$2$subexpression$2", "symbols": ["Char", {"literal":"-"}, "Char"]},
    {"name": "CharGroup$ebnf$2$subexpression$2", "symbols": ["Char"]},
    {"name": "CharGroup$ebnf$2", "symbols": ["CharGroup$ebnf$2", "CharGroup$ebnf$2$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "CharGroup", "symbols": [{"literal":"["}, "CharGroup$ebnf$1", "CharGroup$ebnf$2", {"literal":"]"}], "postprocess":  function(data): Op {
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
        } },
    {"name": "Char", "symbols": [/[0-9A-Za-z@]/], "postprocess":  function(data): string { 
            return data.flat(Infinity)[0];
        } },
    {"name": "Char", "symbols": [{"literal":"."}], "postprocess": (data) => "any"},
    {"name": "Char$subexpression$1", "symbols": [{"literal":"["}]},
    {"name": "Char$subexpression$1", "symbols": [{"literal":"]"}]},
    {"name": "Char$subexpression$1", "symbols": [{"literal":"."}]},
    {"name": "Char$subexpression$1", "symbols": [{"literal":"("}]},
    {"name": "Char$subexpression$1", "symbols": [{"literal":")"}]},
    {"name": "Char$subexpression$1", "symbols": [{"literal":"n"}]},
    {"name": "Char$subexpression$1", "symbols": [{"literal":"^"}]},
    {"name": "Char", "symbols": [{"literal":"\\"}, "Char$subexpression$1"], "postprocess":  function(data): Op {
            return {
                op: 'escapeChar',
                char: data.flat(Infinity)[1]
            };
        } }
  ],
  ParserStart: "Regex",
};

export default grammar;
