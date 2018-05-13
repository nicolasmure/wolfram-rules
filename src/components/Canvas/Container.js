import { connect } from 'react-redux'
import { componentDidMount, shouldComponentUpdate } from 'react-functional-lifecycle'
import { F, pipe } from 'ramda'
import { build } from '../../modules/canvas'
import Canvas from './Canvas'

const mapStateToProps = state => ({
    id: state.canvas.id,
    width: state.canvas.width,
    height: state.canvas.height,
})

const mapDispatchToProps = dispatch => ({
    buildCanvas: (id, width, height) => dispatch(build(id, width, height))
})

const didMount = ({
    buildCanvas,
    id,
    width,
    height,
}) => buildCanvas(id, width, height)

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(pipe(
    componentDidMount(didMount),
    shouldComponentUpdate(F),
)(Canvas))
