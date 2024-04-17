import "./chart/chart.js";

import {getDataByCity, getDataByYear, addData, updateData, removeData} from "./api.js";

const mainBox = document.getElementById("mainBox");
const mainChart = document.getElementById("mainChart");

async function renderMessage(message) {
    mainChart.innerHTML = "";
    let unpacked = await message;
    let messageResult = JSON.stringify(unpacked);
    let html = `<p>${messageResult}</p>`;
    mainChart.innerHTML = html;
}

async function renderMultiMessage(message) {
    let unpacked = await message;
    let messageResult = JSON.stringify(unpacked);
    let html = `<p>${messageResult}</p>`;
    mainChart.innerHTML += html;
}

function renderGreeting() {
    mainBox.innerHTML = "";
    mainChart.innerHTML = "";

    let greeting = `
        <button id="adminButton">Database Management</button>
        <button id="appButton">Application</button>
    `;
    mainBox.innerHTML = greeting;

    const adminButton = document.getElementById("adminButton");
    const appButton = document.getElementById("appButton");

    adminButton.addEventListener("click", renderAdmin);
    appButton.addEventListener("click", renderMain);
}

function renderAdmin() {
    mainBox.innerHTML = "";
    mainChart.innerHTML = "";

    let html = `
        <h3>Database Management</h3>
        <button id="adminBackButton">Back</button>
        <br><br>
        <p>Single Line Operation</p>
        <button id="adminAddButton">INSERT</button>
        <button id="adminUpdateButton">UPDATE</button>
        <button id="adminRemoveButton">DELETE</button>
        <br><br>
        <p>Bulk Operation</p>
        <button id="multiAddButton">INSERT</button>
        <button id="multiUpdateButton">UPDATE</button>
        <button id="multiRemoveButton">DELETE</button>
    `;
    mainBox.innerHTML = html;

    const adminAddButton = document.getElementById("adminAddButton");
    const adminUpdateButton = document.getElementById("adminUpdateButton");
    const adminRemoveButton = document.getElementById("adminRemoveButton");
    const multiAddButton = document.getElementById("multiAddButton");
    const multiUpdateButton = document.getElementById("multiUpdateButton");
    const multiRemoveButton = document.getElementById("multiRemoveButton");
    const adminBackButton = document.getElementById("adminBackButton");
    
    adminAddButton.addEventListener("click", renderInsert);
    adminUpdateButton.addEventListener("click", renderUpdate);
    adminRemoveButton.addEventListener("click", renderDelete);
    multiAddButton.addEventListener("click", renderMultiInsert);
    multiUpdateButton.addEventListener("click", renderMultiUpdate);
    multiRemoveButton.addEventListener("click", renderMultiDelete);
    adminBackButton.addEventListener("click", renderGreeting);
}

function renderInsert() {
    mainBox.innerHTML = "";

    let html = `
        <label for="insertCityBox">City:</label>
        <input type="text" id="insertCityBox" name="" value="Boston"><br>
        <p>Please enter the name of a city</p><br>

        <label for="insertYearBox">Year:</label>
        <input type="number" id="insertYearBox" name="" min="1980" max="2025" step="1" value="2024"><br>
        <p>Please enter a year between 1980 and 2025</p><br>

        <label for="insertValueBox">Value:</label>
        <input type="number" id="insertValueBox" name="" min="0" value="10"><br>
        <p>Please enter the average air quality index</p><br>
        <button id="insertSubmitButton">Submit</button>
        <button id="insertBackButton">Back</button>
    `;
    mainBox.innerHTML = html;

    const insertCityBox = document.getElementById("insertCityBox");
    const insertYearBox = document.getElementById("insertYearBox");
    const insertValueBox = document.getElementById("insertValueBox");
    const insertSubmitButton = document.getElementById("insertSubmitButton");
    const insertBackButton = document.getElementById("insertBackButton");

    insertSubmitButton.addEventListener("click", async () => renderMessage(await addData(insertCityBox.value, insertYearBox.value, insertValueBox.value)));
    insertBackButton.addEventListener("click", renderAdmin);
}

function renderUpdate() {
    mainBox.innerHTML = "";

    let html = `
        <label for="updateCityBox">City:</label>
        <input type="text" id="updateCityBox" name="" value="Boston"><br>
        <p>Please enter the name of a city</p><br>

        <label for="updateYearBox">Year:</label>
        <input type="number" id="updateYearBox" name="" min="1980" max="2025" step="1" value="2024"><br>
        <p>Please enter a year between 1980 and 2025</p><br>

        <label for="updateValueBox">Value:</label>
        <input type="number" id="updateValueBox" name="" min="0" value="10"><br>
        <p>Please enter the average air quality index</p><br>
        <button id="updateSubmitButton">Submit</button>
        <button id="updateBackButton">Back</button>
    `;
    mainBox.innerHTML = html;

    const updateCityBox = document.getElementById("updateCityBox");
    const updateYearBox = document.getElementById("updateYearBox");
    const updateValueBox = document.getElementById("updateValueBox");
    const updateSubmitButton = document.getElementById("updateSubmitButton");
    const updateBackButton = document.getElementById("updateBackButton");

    updateSubmitButton.addEventListener("click", async () => renderMessage(await updateData(updateCityBox.value, updateYearBox.value, updateValueBox.value)));
    updateBackButton.addEventListener("click", renderAdmin);
}

function renderDelete() {
    mainBox.innerHTML = "";

    let html = `
        <label for="deleteCityBox">City:</label>
        <input type="text" id="deleteCityBox" name="" value="Boston"><br>
        <p>Please enter the name of a city</p><br>
 
        <label for="deleteYearBox">Year:</label>
        <input type="number" id="deleteYearBox" name="" min="1980" max="2025" step="1" value="2024"><br>
        <p>Please enter a year between 1980 and 2025</p><br>
 
        <button id="deleteSubmitButton">Submit</button>
        <button id="deleteBackButton">Back</button>
    `;
    mainBox.innerHTML = html;
 
    const deleteCityBox = document.getElementById("deleteCityBox");
    const deleteYearBox = document.getElementById("deleteYearBox");
    const deleteSubmitButton = document.getElementById("deleteSubmitButton");
    const deleteBackButton = document.getElementById("deleteBackButton");
 
    deleteSubmitButton.addEventListener("click", async () => renderMessage(await removeData(deleteCityBox.value, deleteYearBox.value)));
    deleteBackButton.addEventListener("click", renderAdmin);
}

async function addMultiData(cell) {
    let count = 0;
    for (count; count <= cell; count++) {
        const city = document.getElementById(`insertCityBox${count}`).value;
        const year = document.getElementById(`insertYearBox${count}`).value;
        const value = document.getElementById(`insertValueBox${count}`).value;
        renderMultiMessage(await addData(city, year, value));
    }
    renderMultiInsert();
}

async function updateMultiData(cell) {
    let count = 0;
    for (count; count <= cell; count++) {
        const city = document.getElementById(`updateCityBox${count}`).value;
        const year = document.getElementById(`updateYearBox${count}`).value;
        const value = document.getElementById(`updateValueBox${count}`).value;
        renderMultiMessage(await updateData(city, year, value));
    }
    renderMultiUpdate();
}

async function removeMultiData(cell) {
    let count = 0;
    for (count; count <= cell; count++) {
        const city = document.getElementById(`deleteCityBox${count}`).value;
        const year = document.getElementById(`deleteYearBox${count}`).value;
        renderMultiMessage(await removeData(city, year));
    }
    renderMultiDelete();
}

function refreshInsert(cell) {
    let buffer = `
        <button id="insertSubmitButton">Submit</button>
        <button id="insertBackButton">Back</button>
        <br><br>
        <button id="insertAddButton">Add</button>
        <br><br>
        <table>
            <tbody>
    `;

    let i = 0;
    for (i; i <= cell; i++) {
        const city = document.getElementById(`insertCityBox${i}`).value;
        const year = document.getElementById(`insertYearBox${i}`).value;
        const value = document.getElementById(`insertValueBox${i}`).value;
        buffer += `
            <tr>
                <td><label for="insertCityBox${i}">City:</label></td>
                <td><input type="text" id="insertCityBox${i}" name="" value="${city}"></td>
                <td><label for="insertYearBox${i}">Year:</label></td>
                <td><input type="number" id="insertYearBox${i}" name="" min="1980" max="2025" step="1" value="${year}"></td>
                <td><label for="insertValueBox${i}">Value:</label></td>
                <td><input type="number" id="insertValueBox${i}" name="" min="0" value="${value}"></td>
            </tr>
        `;
    }

    let count = cell + 1;

    mainBox.innerHTML = "";
    buffer += `
                <tr>
                    <td><label for="insertCityBox${count}">City:</label></td>
                    <td><input type="text" id="insertCityBox${count}" name="" value="Boston"></td>
                    <td><label for="insertYearBox${count}">Year:</label></td>
                    <td><input type="number" id="insertYearBox${count}" name="" min="1980" max="2025" step="1" value="2024"></td>
                    <td><label for="insertValueBox${count}">Value:</label></td>
                    <td><input type="number" id="insertValueBox${count}" name="" min="0" value="10"></td>
                </tr>
            </tbody>
        </table>
    `;
    mainBox.innerHTML = buffer;
    const insertSubmitButton = document.getElementById("insertSubmitButton");
    const insertBackButton = document.getElementById("insertBackButton");
    const insertAddButton = document.getElementById("insertAddButton");

    insertSubmitButton.addEventListener("click", () => addMultiData(count));
    insertBackButton.addEventListener("click", renderAdmin);
    insertAddButton.addEventListener("click", () => refreshInsert(count));
}

function refreshUpdate(cell) {
    let buffer = `
        <button id="updateSubmitButton">Submit</button>
        <button id="updateBackButton">Back</button>
        <br><br>
        <button id="updateAddButton">Add</button>
        <br><br>
        <table>
            <tbody>
    `;

    let i = 0;
    for (i; i <= cell; i++) {
        const city = document.getElementById(`updateCityBox${i}`).value;
        const year = document.getElementById(`updateYearBox${i}`).value;
        const value = document.getElementById(`updateValueBox${i}`).value;
        buffer += `
            <tr>
                <td><label for="updateCityBox${i}">City:</label></td>
                <td><input type="text" id="updateCityBox${i}" name="" value="${city}"></td>
                <td><label for="updateYearBox${i}">Year:</label></td>
                <td><input type="number" id="updateYearBox${i}" name="" min="1980" max="2025" step="1" value="${year}"></td>
                <td><label for="updateValueBox${i}">Value:</label></td>
                <td><input type="number" id="updateValueBox${i}" name="" min="0" value="${value}"></td>
            </tr>
        `;
    }

    let count = cell + 1;

    mainBox.innerHTML = "";
    buffer += `
                <tr>
                    <td><label for="updateCityBox${count}">City:</label></td>
                    <td><input type="text" id="updateCityBox${count}" name="" value="Boston"></td>
                    <td><label for="updateYearBox${count}">Year:</label></td>
                    <td><input type="number" id="updateYearBox${count}" name="" min="1980" max="2025" step="1" value="2024"></td>
                    <td><label for="updateValueBox${count}">Value:</label></td>
                    <td><input type="number" id="updateValueBox${count}" name="" min="0" value="10"></td>
                </tr>
            </tbody>
        </table>
    `;
    mainBox.innerHTML = buffer;
    const updateSubmitButton = document.getElementById("updateSubmitButton");
    const updateBackButton = document.getElementById("updateBackButton");
    const updateAddButton = document.getElementById("updateAddButton");

    updateSubmitButton.addEventListener("click", () => updateMultiData(count));
    updateBackButton.addEventListener("click", renderAdmin);
    updateAddButton.addEventListener("click", () => refreshUpdate(count));
}

function refreshDelete(cell) {
    let buffer = `
        <button id="deleteSubmitButton">Submit</button>
        <button id="deleteBackButton">Back</button>
        <br><br>
        <button id="deleteAddButton">Add</button>
        <br><br>
        <table>
            <tbody>
    `;

    let i = 0;
    for (i; i <= cell; i++) {
        const city = document.getElementById(`deleteCityBox${i}`).value;
        const year = document.getElementById(`deleteYearBox${i}`).value;
        buffer += `
            <tr>
                <td><label for="deleteCityBox${i}">City:</label></td>
                <td><input type="text" id="deleteCityBox${i}" name="" value="${city}"></td>
                <td><label for="deleteYearBox${i}">Year:</label></td>
                <td><input type="number" id="deleteYearBox${i}" name="" min="1980" max="2025" step="1" value="${year}"></td>
            </tr>
        `;
    }

    let count = cell + 1;

    mainBox.innerHTML = "";
    buffer += `
                <tr>
                    <td><label for="deleteCityBox${count}">City:</label></td>
                    <td><input type="text" id="deleteCityBox${count}" name="" value="Boston"></td>
                    <td><label for="deleteYearBox${count}">Year:</label></td>
                    <td><input type="number" id="deleteYearBox${count}" name="" min="1980" max="2025" step="1" value="2024"></td>
                </tr>
            </tbody>
        </table>
    `;
    mainBox.innerHTML = buffer;
    const deleteSubmitButton = document.getElementById("deleteSubmitButton");
    const deleteBackButton = document.getElementById("deleteBackButton");
    const deleteAddButton = document.getElementById("deleteAddButton");

    deleteSubmitButton.addEventListener("click", () => removeMultiData(count));
    deleteBackButton.addEventListener("click", renderAdmin);
    deleteAddButton.addEventListener("click", () => refreshDelete(count));
}

function renderMultiInsert() {
    mainBox.innerHTML = "";

    let html = `
        <button id="insertSubmitButton">Submit</button>
        <button id="insertBackButton">Back</button>
        <br><br>
        <button id="insertAddButton">Add</button>
        <br><br>
        <table>
            <tbody>
                <tr>
                    <td><label for="insertCityBox0">City:</label></td>
                    <td><input type="text" id="insertCityBox0" name="" value="Boston"></td>
                    <td><label for="insertYearBox0">Year:</label></td>
                    <td><input type="number" id="insertYearBox0" name="" min="1980" max="2025" step="1" value="2024"></td>
                    <td><label for="insertValueBox0">Value:</label></td>
                    <td><input type="number" id="insertValueBox0" name="" min="0" value="10"></td>
                </tr>
            </tbody>
        </table>
    `;
    mainBox.innerHTML = html;
    const insertSubmitButton = document.getElementById("insertSubmitButton");
    const insertBackButton = document.getElementById("insertBackButton");
    const insertAddButton = document.getElementById("insertAddButton");

    insertSubmitButton.addEventListener("click", () => addMultiData(0));
    insertBackButton.addEventListener("click", renderAdmin);
    insertAddButton.addEventListener("click", () => refreshInsert(0));
}

function renderMultiUpdate() {
    mainBox.innerHTML = "";

    let html = `
        <button id="updateSubmitButton">Submit</button>
        <button id="updateBackButton">Back</button>
        <br><br>
        <button id="updateAddButton">Add</button>
        <br><br>
        <table>
            <tbody>
                <tr>
                    <td><label for="updateCityBox0">City:</label></td>
                    <td><input type="text" id="updateCityBox0" name="" value="Boston"></td>
                    <td><label for="updateYearBox0">Year:</label></td>
                    <td><input type="number" id="updateYearBox0" name="" min="1980" max="2025" step="1" value="2024"></td>
                    <td><label for="updateValueBox0">Value:</label></td>
                    <td><input type="number" id="updateValueBox0" name="" min="0" value="10"></td>
                </tr>
            </tbody>
        </table>
    `;
    mainBox.innerHTML = html;
    const updateSubmitButton = document.getElementById("updateSubmitButton");
    const updateBackButton = document.getElementById("updateBackButton");
    const updateAddButton = document.getElementById("updateAddButton");

    updateSubmitButton.addEventListener("click", () => updateMultiData(0));
    updateBackButton.addEventListener("click", renderAdmin);
    updateAddButton.addEventListener("click", () => refreshUpdate(0));
}

function renderMultiDelete() {
    mainBox.innerHTML = "";

    let html = `
        <button id="deleteSubmitButton">Submit</button>
        <button id="deleteBackButton">Back</button>
        <br><br>
        <button id="deleteAddButton">Add</button>
        <br><br>
        <table>
            <tbody>
                <tr>
                    <td><label for="deleteCityBox0">City:</label></td>
                    <td><input type="text" id="deleteCityBox0" name="" value="Boston"></td>
                    <td><label for="deleteYearBox0">Year:</label></td>
                    <td><input type="number" id="deleteYearBox0" name="" min="1980" max="2025" step="1" value="2024"></td>
                </tr>
            </tbody>
        </table>
    `;
    mainBox.innerHTML = html;
    const deleteSubmitButton = document.getElementById("deleteSubmitButton");
    const deleteBackButton = document.getElementById("deleteBackButton");
    const deleteAddButton = document.getElementById("deleteAddButton");

    deleteSubmitButton.addEventListener("click", () => removeMultiData(0));
    deleteBackButton.addEventListener("click", renderAdmin);
    deleteAddButton.addEventListener("click", () => refreshDelete(0));
}

function renderMain() {
    mainBox.innerHTML = "";

    let html = `
        <label for="cityBox">City:</label>
        <input type="text" id="cityBox" name="" value="Boston"><br>
        <p>Please enter the name of a city</p><br>

        <label for="startTime">Start Year:</label>
        <input type="number" id="startTime" name="" min="1980" max="2025" step="1" value="2000"><br>
        <p>Please enter a year between 1980 and 2025</p><br>

        <label for="endTime">End Year:</label>
        <input type="number" id="endTime" name="" min="1980" max="2025" step="1" value="2025"><br>
        <p>Please enter a year between 1980 and 2025</p><br>
        <button id="mainSubmitButton">Submit</button>
        <button id="mainBackButton">Back</button>
    `;
    mainBox.innerHTML = html;

    const cityBox = document.getElementById("cityBox");
    const startTime = document.getElementById("startTime");
    const endTime = document.getElementById("endTime");
    const mainSubmitButton = document.getElementById("mainSubmitButton");
    const mainBackButton = document.getElementById("mainBackButton");

    mainSubmitButton.addEventListener("click", () => renderChart(cityBox.value, startTime.value, endTime.value));
    mainBackButton.addEventListener("click", renderGreeting);
}

async function renderChart(city, start, end) {
    mainBox.innerHTML = "";

    let wiper = `<button id="wiperButton">Back</button>`;
    mainBox.innerHTML = wiper;

    const wiperButton = document.getElementById("wiperButton");
    wiperButton.addEventListener("click", renderMain);

    mainChart.innerHTML = "";

    let dataAll = await getDataByYear(city, start, end);
    let dataCity = dataAll[0][0];
    let dataYear = dataAll.map((x) => x[1].toString());
    let dataValue = dataAll.map((x) => x[2]);

    let html = `<p>${dataCity}</p>`;
    html += `<canvas id="chartBox"></canvas>`;
    mainChart.innerHTML = html;
    const ctx = document.getElementById("chartBox");

    new Chart(
        ctx,
        {
            type: 'line',
            data: {
                labels: dataYear,
                datasets: [
                    {
                        label: 'PM 2.5 Index',
                        data: dataValue,
                        tension: 0.3,
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        }
                    }
                }
            }
        }
    );
}

function main() {
    renderGreeting();
}

main();
