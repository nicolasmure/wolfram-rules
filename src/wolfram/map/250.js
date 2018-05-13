import { BLACK, WHITE } from '../index'

export const buildMap = () => ({
    'BBB': BLACK,
    'BBW': BLACK,
    'BWB': BLACK,
    'BWW': BLACK,
    'WBB': BLACK,
    'WBW': WHITE,
    'WWB': BLACK,
    'WWW': WHITE,
})
