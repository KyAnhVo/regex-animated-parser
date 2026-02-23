import * as nearley from 'nearley';
import grammar from './regexGrammar';
import type { Op } from './regexGrammar';

export default class RegexParser {
  public target: string;
  public parseTree: Op;
  private parser: nearley.Parser;
  
  constructor(target: string) {
    this.parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    this.target = target;
    this.parser.feed(target);
    this.parseTree = this.parser.results[0];
  }

  public test(target: string) {
    console.log(`TESTING ${ target === "" ? "epsilon" : target }`)
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    parser.feed(target);
    console.log(parser.results);
  }
}
