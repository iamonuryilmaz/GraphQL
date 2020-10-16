const movies = [
    {
        id: '1',
        title: 'Leyla ile Mecnun \n',
        description: 'Turkish television comedy series set in Istanbul, Leyla and Mecnun is a surreal and absurd comedy that revolves around the fictional love story between Leyla and Mecnun.',
        year: 2011,
        directorId: '1'
    },
    {
        id: '2',
        title: 'Itirazim Var',
        description: 'There is a murder while at prayer. Selman Bulut, the imam of mosque, starts to investigate the murder and faces with people in the neighborhood.',
        year: 2014,
        directorId: '1'
    },
    {
        id: '3',
        title: 'Pulp Fiction',
        description: 'The lives of two mob hitmen, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        year: 1994,
        directorId: '2'
    }
];

const directors = [
    {
        id: '1',
        name: 'Onur Ünlü',
        birth: 1967
    },
    {
        id: '2',
        name: 'Brian De Palma',
        birth: 1940
    },
    {
        id: '3',
        name: 'Quentin Tarantino',
        birth: 1963
    }
];

module.exports = {
    directors,
    movies
};
