import cytoscape from 'cytoscape'

const colors = ['#16a085', '#2980b9']
const groupToColor = (group) => {
  return (group !== undefined) ? colors[group] : '#ddd'
}

const shapes = ['roundrectangle', 'ellipse']
const groupToShape = (group) => {
  return (group !== undefined) ? shapes[group] : 'ellipse'
}

const style = cytoscape.stylesheet()
  .selector('node')
    .css({
      'content': 'data(name)',
      'width':  'mapData(value, 0, 10, 30, 100)',
      'height': 'mapData(value, 0, 10, 30, 100)',
      'shape': function(ele){ return groupToShape(ele.data('group')) },
      'text-valign': 'center',
      'color': 'white',
      'text-outline-width': 2,
      'font-weight': 300,
      'text-outline-color': function(ele){ return groupToColor(ele.data('group')) },
      'background-color':   function(ele){ return groupToColor(ele.data('group')) }
    })
  .selector('edge')
    .css({
      'label': 'data(value)',

      'text-outline-width': 2,
      'font-size': '0.8em',

      'curve-style': 'bezier',
      'target-arrow-shape': 'triangle',
      'source-arrow-shape': 'circle',

      'text-outline-color': 'mapData(value, 1, 3, #FBE9E7, #BF360C)',
      'line-color':         'mapData(value, 1, 3, #FBE9E7, #BF360C)',
      'source-arrow-color': 'mapData(value, 1, 3, #FBE9E7, #BF360C)',
      'target-arrow-color': 'mapData(value, 1, 3, #FBE9E7, #BF360C)',

      'width': 'mapData(p, 0, 1, 5, 0)'
    })

export let conf = {
  style: style,
  zoomingEnabled: true
}

export let layout = {
  name: 'cose',

  // Called on `layoutready`
  ready: function(){},

  // Called on `layoutstop`
  stop: function(){},

  // Whether to animate while running the layout
  animate: true,

  // The layout animates only after this many milliseconds
  // (prevents flashing on fast runs)
  animationThreshold: 250,

  // Number of iterations between consecutive screen positions update
  // (0 -> only updated on the end)
  refresh: 20,

  // Whether to fit the network view after when done
  fit: true,

  // Padding on fit
  padding: 10,

  // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  boundingBox: undefined,

  // Randomize the initial positions of the nodes (true) or use existing positions (false)
  randomize: true,

  // Extra spacing between components in non-compound graphs
  componentSpacing: 700,

  // Node repulsion (non overlapping) multiplier
  nodeRepulsion: function( node ){ return 100000; },

  // Node repulsion (overlapping) multiplier
  nodeOverlap: 10,

  // Ideal edge (non nested) length
  idealEdgeLength: function( edge ){ return 15; },

  // Divisor to compute edge forces
  edgeElasticity: function( edge ){ return 100; },

  // Nesting factor (multiplier) to compute ideal edge length for nested edges
  nestingFactor: 10,

  // Gravity force (constant)
  gravity: 10,

  // Maximum number of iterations to perform
  numIter: 10000,

  // Initial temperature (maximum node displacement)
  initialTemp: 200,

  // Cooling factor (how the temperature is reduced between consecutive iterations
  coolingFactor: 0.95,

  // Lower temperature threshold (below this point the layout will end)
  minTemp: 1.0,

  // Whether to use threading to speed up the layout
  useMultitasking: true
}

