const isProduct = process.env.cENV === 'product'

module.exports = {
    basePath: isProduct ? '/nextjs-blog' : '',
    assetPrefix: isProduct ? '/nextjs-blog/' : '',
    env: {
        isProduct
    },
    experimental: {
        newNextLinkBehavior: false
    }
}