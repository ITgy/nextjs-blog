const isProduct = process.env.cENV === 'product'

console.log('isProduct',isProduct)

module.exports = {
    basePath: isProduct ? '/blog-deploy' : '',
    assetPrefix: isProduct ? '/blog-deploy/' : '',
    env: {
        isProduct
    },
    experimental: {
        newNextLinkBehavior: false
    }
}