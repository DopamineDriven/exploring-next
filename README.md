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
