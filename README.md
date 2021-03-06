# exploring-next
- next.js

https://nodejs.org/api/process.html#process_process_env

### server vs client side rendering
- pages directory is required by next.js


### mimic rest production server
- https://npmjs.com/package/json-server
- npm run json-server

### Pascal-Case
- components always named in pascal-case
    - first letter uppercase
    - includes components in pages directory
    - why are pages lowercase? routing issue

## Next.js Performance benefits
- Code splitting by default
    - Each web page is a special js code segment rendering on its own
    - Only the JSX for each page navigated to is loaded to browser 
- Prefetching pages asynchronously
    - link prefetch
        - aggressively downloads asynchronously codesplit JS files the user has not yet browsed to 
        - In this way, when a user navigates to another page in pages folder the JS may already be downloaded improving UX
- ETags automatically generated
- Optimized for React Babel configuration 
    - Handled by nextjs team 
- Javascript files loaded async by default 
- Server-side rendering works 

### Other improvements that can be implemented
- Next image plugin
    - better image handling
    - served from image tag
- Server side page cache
    - Cache React pages inside Node server 
    - Will serve repeated React pages 20x faster
- Setup CDN for Code Split JS and images 
    - Amazon's CloudFront 
    - Served seamlessly from points all over the world 
- Placeholder images while waiting for data to download
    - Animated lines of what appears to be data to ensure user data is being downloaded 

### See next-compose-plugins npm to avoid embedding nests

## Downsides of Server-Side Rendering
- Every page landing causes a complex Node invocation 
    - Could bog down even strong servers
    - Some say server-side rendered apps are wrong for high volume sites for this very reason 
- High volume sites like Airbnb and Facebook that use React, so how do they keep them fast?
    - Implement caching schemes to keep servers fresh and fast
        - server-side caches

### Enter LRU cache
- over 11 million weekly downloads
- use in server (ssrCache)
    - cache object that deletes the least recently used items 
- use curl commands to test how long the first call takes (precache) then another call thereafter once LRUcache is set up
    - curl -s -w "%{time_total}\n" -o /dev/null http://142.93.194.248/speakers
        - 4.036826
    - curl -s -w "%{time_total}\n" -o /dev/null http://142.93.194.248/speakers
        - 0.348377
    - cached url -> response over 10x faster


## CDN: Content Delivery Network
- Amazon CloudFront
- purchased domain name asross311.com (namecheap)
- US government healthcare website went down for weeks because all assets (css, images, js, etc) on site just pointed back to hosting url with a relative path; no CDN
- can add an asset prefix above inlineImageLimit in next.config.js pointing to CDN (assetPrefix: 'http://xyz.cloudfront.net')

### Network dev tool
- Indicates how many requests per url (32 currently)
