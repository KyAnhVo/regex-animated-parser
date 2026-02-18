/** This file is for regex parsing.
 *  
 *  Regex leaf nodes:
 *  - Character class         [...]
 *  - Negated character class [^...]
 *  - Wildcard                .
 *  - Digit                   \d
 *  - Non-digit               \D
 *  - word                    \w
 *  - non-word                \W
 *  - whitespace              \s
 *  - non-whitespace          \S
 *  - start of string         ^
 *  - end of string           $
 *
 *  The regex groupings (suppose A and B are regex substrings):
 *  - Grouping                (A)
 *  - Kleene closure          A*
 *  - Plus                    A+ = AA*
 *  - Concatanation           AB
 *  - Disjunction             A|B
 *  - Optional                A? = (A|)
 */

/** Language
 *  
 *  <L>             ->  <Conjunction> | <Conjunction>"|"<Conjunction>
 *  <Conjunction>   ->  <Term><Term>
 *  <Term>          ->  <SimpleTerm> | <SimpleTerm>* | <SimpleTerm>+ | <SimpleTerm>? | <SimpleTerm>{int} |
 *                      <SimpleTerm>{int,} | <SimpleTerm>{,int} | <SimpleTerm>{int,int}
 *  <SimpleTerm>    ->  <Chars> | (<L>)
 *  <Chars>         ->  [<Charlist>] | [^<Charlist>] | <Char>
 *  <Charlist>      ->  <Char>-<Char> | <Char>-<Char><Charlist> | <Char><Charlist>
 *  <Char>          ->  <Ascii> | <Escaped>
 *  <Escaped>       ->  \<Ascii> (NOTE: Do check here in validation step)
 */



export default class RegexParser {
  public target: string;
  
  constructor(target: string) {
    this.target = target;
    
  }
}
