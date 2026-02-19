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
    {"name": "Regex", "symbols": ["Conjunction"]},
    {"name": "Regex", "symbols": ["Conjunction", {"literal":"|"}, "Conjunction"]},
    {"name": "Conjunction", "symbols": ["Term"]},
    {"name": "Conjunction", "symbols": ["Conjunction", "Term"]},
    {"name": "Term", "symbols": ["SimpleTerm"]},
    {"name": "Term", "symbols": ["SimpleTerm", "UnaryOps"]},
    {"name": "Term", "symbols": ["SimpleTerm", "Quantifier"]},
    {"name": "UnaryOps", "symbols": [{"literal":"+"}]},
    {"name": "UnaryOps", "symbols": [{"literal":"*"}]},
    {"name": "UnaryOps", "symbols": [{"literal":"?"}]},
    {"name": "Quantifier", "symbols": ["ExactQuantifier"]},
    {"name": "Quantifier", "symbols": ["MinQuantifier"]},
    {"name": "Quantifier", "symbols": ["MaxQuantifier"]},
    {"name": "Quantifier", "symbols": ["MinMaxQuantifier"]},
    {"name": "ExactQuantifier", "symbols": [{"literal":"{"}, "Int", {"literal":"}"}]},
    {"name": "MinQuantifier$string$1", "symbols": [{"literal":","}, {"literal":"}"}], "postprocess": (d) => d.join('')},
    {"name": "MinQuantifier", "symbols": [{"literal":"{"}, "Int", "MinQuantifier$string$1"]},
    {"name": "MaxQuantifier$string$1", "symbols": [{"literal":"{"}, {"literal":","}], "postprocess": (d) => d.join('')},
    {"name": "MaxQuantifier", "symbols": ["MaxQuantifier$string$1", "Int", {"literal":"}"}]},
    {"name": "MinMaxQuantifier", "symbols": [{"literal":"{"}, "Int", {"literal":","}, "Int", {"literal":"}"}]},
    {"name": "SimpleTerm", "symbols": ["Printable"]},
    {"name": "SimpleTerm", "symbols": ["Escape", "Printable"]},
    {"name": "SimpleTerm", "symbols": [{"literal":"("}, "Regex", {"literal":")"}]},
    {"name": "Escape", "symbols": [{"literal":"\\"}]},
    {"name": "Int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "Int$ebnf$1", "symbols": ["Int$ebnf$1", /[0-9]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Int", "symbols": ["Int$ebnf$1"]},
    {"name": "Printable", "symbols": [/[ -~]/]}
  ],
  ParserStart: "Regex",
};

export default grammar;
