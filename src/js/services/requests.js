// при отправке данных
const postData = async (url, data) => {
    // для постинга всегда указываем объект с параметрами
    let res = await fetch(url, {
        method: "POST",
        body: data
    });
    // ?
    return await res.text();
};

// при отправке данных
const getResource = async (url) => {
    // для постинга всегда указываем объект с параметрами
    let res = await fetch(url);
    
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }
    return await res.json();
};

export {postData, getResource};