export interface Vertex {
  id:         number,
  isInitial:  boolean,
  isFinal:    boolean,
};

export interface Edge {
  source:   Vertex,
  target:   Vertex,
  label:    string,
  focused:  boolean,
}

function makeVertexFunction(): (isInitial: boolean, isFinal: boolean) => Vertex {
  let id: number = 0;
  return (isInitial: boolean, isFinal: boolean) => {
    const currId: number = id++;
    return {
      id: currId,
      isInitial: isInitial,
      isFinal: isFinal,
    }
  }
}

const makeVertex = makeVertexFunction();

function createVertex(isInitial: boolean, isFinal: boolean) {
  return makeVertex(isInitial, isFinal);
}

function createEdge(source: Vertex, target: Vertex, label: string, focused: boolean): Edge {
  return {
    source: source,
    target: target,
    label: label,
    focused: focused,
  };
}

// ----------------------------------------------------------

export default class Graph {
  vertices: Set<Vertex> = new Set();
  edges: Set<Edge>      = new Set();
  
  addVertex(isInitial: boolean = false, isFinal: boolean = false): Vertex {
    let v: Vertex = createVertex(isInitial, isFinal);
    this.vertices.add(v);
    return v;
  }

  addEdge(source: Vertex, target: Vertex, label: string, focused: boolean): Edge|null {
    if (!this.vertices.has(source))
      return null
    if (!this.vertices.has(target))
      return null
    let e: Edge = createEdge(source, target, label, focused);
    this.edges.add(e);
    return e;
  }

  ojectify() {
    return {
      "nodes": [...this.vertices],
      "links": [...this.edges],
    };
  }
}
