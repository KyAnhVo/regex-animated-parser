// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
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
    {"name": "MinQuantifier$string$1", "symbols": [{"literal":","}, {"literal":"}"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "MinQuantifier", "symbols": [{"literal":"{"}, "Int", "MinQuantifier$string$1"]},
    {"name": "MaxQuantifier$string$1", "symbols": [{"literal":"{"}, {"literal":","}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "MaxQuantifier", "symbols": ["MaxQuantifier$string$1", "Int", {"literal":"}"}]},
    {"name": "MinMaxQuantifier", "symbols": [{"literal":"{"}, "Int", {"literal":","}, "Int", {"literal":"}"}]},
    {"name": "SimpleTerm", "symbols": ["Printable"]},
    {"name": "SimpleTerm", "symbols": ["Escape", "Printable"]},
    {"name": "SimpleTerm$subexpression$1", "symbols": ["Regex"]},
    {"name": "SimpleTerm", "symbols": ["SimpleTerm$subexpression$1"]},
    {"name": "Escape", "symbols": [{"literal":"\\"}]},
    {"name": "Int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "Int$ebnf$1", "symbols": ["Int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Int", "symbols": ["Int$ebnf$1"]},
    {"name": "Printable", "symbols": [/[ -~]/]}
]
  , ParserStart: "Regex"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
  window.grammar = grammar;
}
})();
