async function getDataByCity(city) {
   try {
       const headerFields = { "Content-Type": "application/json" };
       const obj = { "city": city };
       const response = await fetch(
           "/select-all",
           {
               method: "POST",
               body: JSON.stringify(obj),
               headers: headerFields
           }
       );
       const data = await response.json();
       return data;
   }
   catch (error) {
       console.log(error);
   }
}

async function getDataByYear(city, start, end) {
   try {
       const headerFields = { "Content-Type": "application/json" };
       const obj = {
           "city": city,
           "start": start,
           "end": end
       };
       const response = await fetch(
           "/select-between",
           {
               method: "POST",
               body: JSON.stringify(obj),
               headers: headerFields
           }
       );
       const data = await response.json();
       return data;
   }
   catch (error) {
       console.log(error);
   }
}

async function addData(city, year, value) {
   try {
       const headerFields = { "Content-Type": "application/json" };
       const obj = {
           "city": city,
           "year": year,
           "value": value
       };
       const response = await fetch(
           "/add",
           {
               method: "POST",
               body: JSON.stringify(obj),
               headers: headerFields
           }
       );
       const data = await response.json();
       return data;
   }
   catch (error) {
       console.log(error);
   }
}

async function updateData(city, year, value) {
   try {
       const headerFields = { "Content-Type": "application/json" };
       const obj = {
           "city": city,
           "year": year,
           "value": value
       };
       const response = await fetch(
           "/update",
           {
               method: "POST",
               body: JSON.stringify(obj),
               headers: headerFields
           }
       );
       const data = await response.json();
       return data;
   }
   catch (error) {
       console.log(error);
   }
}

async function removeData(city, year) {
   try {
       const headerFields = { "Content-Type": "application/json" };
       const obj = {
           "city": city,
           "year": year
       };
       const response = await fetch(
           "/remove",
           {
               method: "POST",
               body: JSON.stringify(obj),
               headers: headerFields
           }
       );
       const data = await response.json();
       return data;
   }
   catch (error) {
       console.log(error);
   }
}

export {getDataByCity, getDataByYear, addData, updateData, removeData};
