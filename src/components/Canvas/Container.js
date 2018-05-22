import { connect } from 'react-redux'
import { componentDidMount, shouldComponentUpdate } from 'react-functional-lifecycle'
import { F, pipe } from 'ramda'
import { build } from '../../modules/canvas'
import Canvas from './Canvas'

const mapStateToProps = state => ({
    projectionId: state.canvas.projectionId,
    width: state.canvas.width,
    height: state.canvas.height,
})

const mapDispatchToProps = dispatch => ({
    buildCanvas: (projectionId, width, height) => dispatch(build(projectionId, width, height))
})

const didMount = ({
    buildCanvas,
    projectionId,
    width,
    height,
}) => buildCanvas(projectionId, width, height)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(pipe(
    componentDidMount(didMount),
    shouldComponentUpdate(F),
)(Canvas))
