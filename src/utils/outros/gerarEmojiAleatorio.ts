export default function gerarEmojiAleatorio() {
    const emojis = [
        '🤠', '😁', '🤠', '😺', '👋',
        '👊', '✨', '👍', '🙃', '🤯',
        '👽', '👻', '🖖'
    ];

    const random = Math.floor(Math.random() * emojis.length);
    return emojis[random];
}