export const stops = [
    {
        stop_id: '1',
        stop_code: '1',
        stop_name: 'Avenida Valdemarín - Blanca De Castilla',
        stop_desc: '',
        stop_lat: '40.4701',
        stop_lon: '-3.78288',
        stop_url:
            'http://www.emtmadrid.es/aplicaciones/Estimaciones.aspx?idStop=1&Estado=1&panel=6',
    },
    {
        stop_id: '2',
        stop_code: '2',
        stop_name: 'Avenida Valdemarín - La Salle',
        stop_desc: '',
        stop_lat: '40.46862',
        stop_lon: '-3.78596',
        stop_url:
            'http://www.emtmadrid.es/aplicaciones/Estimaciones.aspx?idStop=2&Estado=1&panel=6',
    },
];

export function fakeStopsList(count) {
    const list = [];
    for (let i = 0; i < count; i += 1) {
        list.push({
            stop_id: stops[i].stop_id,
            stop_code: stops[i].stop_code,
            stop_name: stops[i].stop_name,
            stop_desc: stops[i].stop_desc,
            stop_lat: stops[i].stop_lat,
            stop_lon: stops[i].stop_lon,
            stop_url: stops[i].stop_url,
        });
    }
    return list;
}

export function getGTFS(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const count = stops.length;

    const result = fakeStopsList(count);

    if (res && res.json) {
        res.json(result);
    } else {
        return result;
    }
}
