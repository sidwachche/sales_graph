import data from '../../Data/data';
import weeks from '../../Data/week';

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
  let seriesData = [];
  for (let i = 0; i < array.length; i++) {
    if (i < 3) {
      continue;
    }
    seriesData.push(Number(array[i]));
  }
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
export function consolidatedGeoDemo(id, type) {
  return data
    .filter(item => item[type] == id)
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
}
export function deriveOptionFromGeoDemo(id, type) {
  return {
    title: {
      text: 'Overall Sales'
    },
    xAxis: {
      categories: weeks
    },
    series: [{ data: consolidatedGeoDemo(id, type) }]
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
function getSum(arr) {
  return Object.values(arr)
    .slice(3)
    .reduce((acc, cur) => Number(acc) + Number(cur), 0);
}
export function pieDataGeoDemo(type) {
  return data.reduce((acc, cur) => {
    let sum = getSum(cur);
    let foundIndex = acc.findIndex(item => item.name == cur[type]);
    if (foundIndex > -1) {
      acc[foundIndex].y += sum;
    } else {
      let obj = {};
      obj.name = cur[type];
      obj.y = sum;
      acc.push(obj);
    }
    return acc;
  }, []);
}
export function pieStoreDataGeo() {
  let arr = data.map(item => {
    return { name: item.StoreID, y: getSum(item) };
  });
  arr.sort((a, b) => {
    if (a.y > b.y) return -1;
    if (a.y < b.y) return 1;
    return 0;
  });
  return arr.slice(0, 5);
}

export function pieOptions(type) {
  let opt =
    type === 'Stores'
      ? pieStoreDataGeo()
      : pieDataGeoDemo(type).filter(item => item.y !== 0);
  return {
    ...defaultPieOpt,
    series: [
      {
        name: 'Brands',
        colorByPoint: true,
        data: opt
      }
    ]
  };
}

export const defaultPieOpt = {
  chart: {
    type: 'pie'
  },
  title: {
    text: 'Top Performers'
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
      }
    }
  },
  series: [
    {
      name: 'Brands',
      colorByPoint: true,
      data: []
    }
  ]
};
