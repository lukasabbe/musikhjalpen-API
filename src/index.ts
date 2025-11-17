import express, { json } from 'express'
import cors from 'cors'
import { rateLimit } from 'express-rate-limit'
import { Amount, CollectionData, Donator } from './types'
import dotenv from 'dotenv'

dotenv.config()

const limiter = rateLimit({
    windowMs: 1000 * 60, // 1 minute
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56
})

const app = express()
app.use(cors())
app.use(json())
app.use(limiter)

const HEAD_LINK = 'https://bossan.musikhjalpen.se'

const PORT = process.env.PORT || 3000

app.get('/api/collection/:id', async (req, res) => {
    if(req.params.id == "favicon.ico"){
        res.status(204).end()
        return
    }

    // Validate `id` to allow only letters, numbers, dashes, and underscores (adjust as needed)
    if (!/^[a-zA-Z0-9_-]+$/.test(req.params.id)) {
        return res.status(400).json({ error: 'Invalid collection ID' });
    }

    const data = await fetch(`${HEAD_LINK}/page-data/${req.params.id}/page-data.json`)


    if (data.status !== 200) {
        res.status(404).json({ error: 'Not found' })
        return
    }

    let catched = false;
    const collectionData = (await data.json().catch(() => catched = true )) as CollectionData

    if(catched){
        return res.status(404).json({ error: 'Not found' })
    }

    const contentfulFundraiser = collectionData.result.data.contentfulFundraiser
    const amount = (await (
        await fetch(
            `https://musikhjalpen-franceska.herokuapp.com/server/fundraisers/${contentfulFundraiser.contentful_id}?fields%5B%5D=amount&fields=prev_amount`
        )
    ).json()) as Amount

    const dontaros = (await (
        await fetch(`https://musikhjalpen-franceska.herokuapp.com/server/fundraisers/donations/${contentfulFundraiser.contentful_id}/0`)
    ).json()) as Donator[];

    return res.json({
        collectionId: contentfulFundraiser.contentful_id,
        title: contentfulFundraiser.title,
        path: contentfulFundraiser.path,
        description: contentfulFundraiser.description.description,
        goal: contentfulFundraiser.goal,
        externalLink: contentfulFundraiser.externalLink,
        startDate: contentfulFundraiser.startDate,
        endDate: contentfulFundraiser.endDate,
        address: contentfulFundraiser.address,
        city: contentfulFundraiser.city,
        createdAt: contentfulFundraiser.createdAt,
        image: contentfulFundraiser.image.url,
        amount: amount.amount,
        prev_amount: amount.prev_amount,
        donators: dontaros
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
