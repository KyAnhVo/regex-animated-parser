interface Vertex {
  id:         number,
  isInitial:  boolean,
  isFinal:    boolean,
};

interface Edge {
  source:   number,
  target:   number,
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

function createEdge(source: number, target: number, label: string, focused: boolean): Edge {
  return {
    source: source,
    target: target,
    label: label,
    focused: focused,
  };
}

// ----------------------------------------------------------

class Graph {
  vertices: Map<number, Vertex> = new Map();
  edges: Set<Edge>      = new Set();
  
  addVertex(isInitial: boolean = false, isFinal: boolean = false): Vertex {
    let v: Vertex = createVertex(isInitial, isFinal);
    this.vertices.set(v.id, v);
    return v;
  }

  addEdge(source: number, target: number, label: string, focused: boolean): Edge {
  }
}
