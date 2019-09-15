import data from '../../Data/data';
import weeks from '../../Data/week';
import dummy from '../../Data/dummy';

export function getInitialData() {
  const allStores = new Set();
  const allGeoId = new Set();
  const allDemoId = new Set();
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    if (element.StoreID) allStores.add(element.StoreID);
    if (element.GeographicalID) allGeoId.add(element.GeographicalID);
    if (element.DemoGraphicID) allDemoId.add(element.DemoGraphicID);
  }
  return {
    allStores: Array.from(allStores),
    allGeoId: Array.from(allGeoId),
    allDemoId: Array.from(allDemoId)
  };
}

export function deriveOptionFromStore(storeId) {
  let array = Object.values(data.find(item => item.StoreID == storeId));
  console.log(array);
  let seriesData = [];
  for (let i = 0; i < array.length; i++) {
    if (i < 3) {
      continue;
    }
    seriesData.push(Number(array[i]));
  }
  console.log(seriesData);
  return {
    title: {
      text: 'Overall Sales'
    },
    xAxis: {
      categories: weeks
    },
    series: [{ data: seriesData }]
  };
}

export function deriveOptionFromGeoDemo(id, type) {
  let array = data.filter(item => item[type] == id);

  let seriesData = array
    .reduce((acc, cur) => {
      Object.values(cur).map((ele, index) => {
        if (isNaN(acc[index]) && index > 2) {
          acc[index] = 0 + Number(ele);
        } else if (index > 2) {
          acc[index] = Number(acc[index]) + Number(ele);
        }
      });
      return acc;
    }, [])
    .slice(3);
  console.log(seriesData);
  return {
    title: {
      text: 'Overall Sales'
    },
    xAxis: {
      categories: weeks
    },
    series: [{ data: seriesData }]
  };
}
export const defaultOpt = {
  title: {
    text: 'Overall Sales'
  },
  xAxis: {
    categories: []
  },
  series: [{ data: [] }]
};

export const defaultInitialData = {
  allStores: [],
  allGeoId: [],
  allDemoId: []
};
