import type {Op} from './regexGrammar'
import RegexParser from './regexParser'

interface State {
  transitions: { [key: string]: State }
};

interface Graph {
  q0: State | null
  qf: State | null
}

export default class NFA {
  public startState: State | null;
  public endState: State | null;

  constructor(regexStr: string) {    
    const parser = new RegexParser(regexStr);
    const graph = this.constructNfa(parser.parseTree);
    this.startState = graph.q0;
    this.endState = graph.qf
  }

  private constructNfa(tree: Op | string): Graph {
    const g: Graph = { q0: null, qf: null }
    if (typeof tree === 'string') {
      g.qf = { transitions: {} };
      g.q0 = { transitions: { tree: g.qf } };
    } else {
      switch (tree.op) {
        case 'disjunction':
          
          break;
        case 'concatenation':
          break;
        case 'term':
          break;
        case 'quantifier':
          break;
        case 'charGroups':
          break;
        default:
          break;
      }
    }

    return g;
  }
}
