const someCommonValues = ['common', 'values'];

export const getImagePath = (path) => {
   return `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${ path}`;
};

export const getPosterImagePath = (path) => {
   return `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${ path}`;
};

export const justAnAlert = () => {
   alert('hello');
};