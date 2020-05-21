export function randomString(count) {
        let result = ''
        let words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
        for (let i = 0; i < count; ++i) {
            let position = Math.floor(Math.random() * words.length - 1)
            result += words.substring(position, position + 1);
        }
        return result;
}
