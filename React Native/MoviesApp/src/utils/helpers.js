export const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

export const filterAdultContent = (movies) => {
    const adultRatings = ['R', 'NC-17', '18+', 'X'];
    return movies.filter(movie => !adultRatings.includes(movie.Rated));
};