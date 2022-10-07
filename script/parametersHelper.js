import { minesLocation } from "./main.js";

let arrMinesLocation = minesLocation;

export function getURLParams(mockdataParam) {
    const parameters = new URLSearchParams(window.location.search);
    let mockDataValue = parameters.get(mockdataParam);
    if (parameters.has('mockdata')) {
        for (let i = 0; i < mockDataValue.length; i++) {
            if (mockDataValue[i].includes("-")) {
                mockDataValue = mockDataValue.split("-");
            } else if (mockDataValue[i].includes(" ")) {
                mockDataValue = mockDataValue.split(" ");
            }
        }
    } else {
        mockDataValue = null;
    }
    return mockDataValue;
}


function splitMockdata(mockdata, separator) {
    
}

function getMinePosition(params) {
    
}

export function setMinesMockdata() {
    
}

