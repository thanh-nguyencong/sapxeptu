export const dynamic = 'force-dynamic';
import { parse } from 'node-html-parser';

export async function GET(request) {
    // return Response.json({ words: ['rat', 'tar', 'art' ] })
    const { searchParams } = new URL(request.url)
    const text = searchParams.get('submittedText')
    const wordUnscramblerResponse = await fetch(`https://wordunscrambler.me/unscramble/${text}`)
    const wordUnscramblerContent = await wordUnscramblerResponse.text()
    const root = parse(wordUnscramblerContent)
    const words = root.querySelector('.list-wrapper').querySelectorAll('.wordWrapper').map(it => it.getAttribute('data-word'))
    return Response.json({ words: words })
}