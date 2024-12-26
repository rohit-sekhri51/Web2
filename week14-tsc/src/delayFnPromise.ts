function delayCall(xy: () => number): Promise<number> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = xy();
            console.log(result);
            resolve(result);
        }, 5000);
    });
}

function multiplyPromise(a: number, b: number): number {
    console.log("Welcome!");
    return a * b;
}

// Usage with async/await
async function run() {
    const result = await delayCall(() => multiplyPromise(30, 55));
    console.log('Result from promise:', result);
}

run();