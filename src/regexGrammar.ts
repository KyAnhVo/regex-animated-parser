// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }

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
    {"name": "Regex", "symbols": ["Conjunction", "Regex$ebnf$1"], "postprocess":  function(data) {
            if (data.length === 1) return data[0];
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
    {"name": "Conjunction", "symbols": ["Conjunction$ebnf$1"], "postprocess":  (data) => {
            if (data.length === 1) return data[0];
            return {
                op: "concatenation",
                children: data
            };
        } },
    {"name": "Term$ebnf$1$subexpression$1", "symbols": [{"literal":"*"}]},
    {"name": "Term$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "Term$ebnf$1$subexpression$1", "symbols": [{"literal":"?"}]},
    {"name": "Term$ebnf$1$subexpression$1", "symbols": ["Quantifier"]},
    {"name": "Term$ebnf$1", "symbols": ["Term$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "Term$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "Term", "symbols": ["SimpleTerm", "Term$ebnf$1"], "postprocess":  function(data) {
            if (data[1] === null) return data[0];
            return {
                op: "term",
                object: data[0],
                quantifier: data[1]
            }  
        } },
    {"name": "SimpleTerm", "symbols": ["Char"]},
    {"name": "SimpleTerm", "symbols": [{"literal":"("}, "Regex", {"literal":")"}], "postprocess":  (data) => {
            return data;
        } },
    {"name": "Quantifier$subexpression$1", "symbols": ["Int"]},
    {"name": "Quantifier$subexpression$1", "symbols": ["Int", {"literal":","}]},
    {"name": "Quantifier$subexpression$1", "symbols": [{"literal":","}, "Int"]},
    {"name": "Quantifier$subexpression$1", "symbols": ["Int", {"literal":","}, "Int"]},
    {"name": "Quantifier", "symbols": [{"literal":"{"}, "Quantifier$subexpression$1", {"literal":"}"}]},
    {"name": "Int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "Int$ebnf$1", "symbols": ["Int$ebnf$1", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Int", "symbols": ["Int$ebnf$1"], "postprocess": (data) => Number(data.join())},
    {"name": "Char", "symbols": [/[0-9A-Za-z@]/], "postprocess": id}
  ],
  ParserStart: "Regex",
};

export default grammar;
