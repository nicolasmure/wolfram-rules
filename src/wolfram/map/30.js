import { BLACK, WHITE } from '../index'

export const buildMap = () => ({
    'BBB': WHITE,
    'BBW': WHITE,
    'BWB': WHITE,
    'BWW': BLACK,
    'WBB': BLACK,
    'WBW': BLACK,
    'WWB': BLACK,
    'WWW': WHITE,
})
