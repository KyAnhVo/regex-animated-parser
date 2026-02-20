import * as nearley from 'nearley';
import grammar from './regexGrammar';

export default class RegexParser {
  public target: string;
  public parser: nearley.Parser;
  
  constructor(target: string) {
    this.target = target;
    this.parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    this.parser.feed("a{1,}b");
    console.log(this.parser.results);
  }

}
