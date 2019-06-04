module.exports = {
    "roots": [
        "<rootDir>"
    ],
    "transform": {
        "^.+\\.ts?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)).(test|spec).(jsx?|ts?)$",
    "coverageReporters": [
        "cobertura"
    ]
}