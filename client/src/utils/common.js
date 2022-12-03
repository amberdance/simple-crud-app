export const getRandomNumber = (min = 1, max = 99) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomHexColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};

export const camelizeObject = (obj) =>
  _.transform(obj, (acc, value, key, target) => {
    const camelKey = _.isArray(target) ? key : _.camelCase(key);

    acc[camelKey] = _.isObject(value) ? camelizeObject(value) : value;
  });

export const deepDiffObject = (base, object) => {
  if (!object) {
    throw new Error(`The object compared should be an object: ${object}`);
  }

  if (!base) return object;

  const result = _.transform(object, (result, value, key) => {
    if (!_.has(base, key)) result[key] = value;
    if (!_.isEqual(value, base[key])) {
      result[key] =
        _.isPlainObject(value) && _.isPlainObject(base[key])
          ? deepDiffObject(base[key], value)
          : value;
    }
  });

  _.forOwn(base, (value, key) => {
    if (!_.has(object, key)) result[key] = undefined;
  });

  return result;
};

// Does not provide a nested objects
export const removeEmptyFields = (obj, filterBoolean = false) => {
  let result = _.omitBy(
    obj,
    (val) => _.isUndefined(val) || _.isNull(val) || val === ""
  );

  if (filterBoolean) result = _.omitBy(result, (val) => val === false);

  return result;
};
