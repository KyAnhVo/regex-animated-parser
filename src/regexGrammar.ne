@preprocessor typescript

Regex -> Conjunction | Conjunction "|" Conjunction
Conjunction -> Term | Conjunction Term
Term -> SimpleTerm | SimpleTerm UnaryOps | SimpleTerm Quantifier
UnaryOps -> "+" | "*" | "?"
Quantifier -> ExactQuantifier | MinQuantifier | MaxQuantifier | MinMaxQuantifier
ExactQuantifier -> "{" Int "}"
MinQuantifier -> "{" Int ",}"
MaxQuantifier -> "{," Int "}"
MinMaxQuantifier -> "{" Int "," Int "}"
SimpleTerm -> Printable | Escape Printable | "(" Regex ")" 
Escape -> "\\"
Int -> [0-9]:+
Printable -> [ -~]
