import ZeroServerUtils from "../lib/ZeroServerUtils"

export default (utils) => {
    if(utils.url.pathname === "/login") {
        utils
            .status(200)
            .header("Content-Type", ZeroServerUtils.getContentType(".html"))
            .end(loginPage)
            
        return true
    } 
    
    if(utils.req.method === "GET" && utils.url.pathname === "/getCredentials") {
        utils.json({
            userId: utils.req.headers["x-replit-user-id"],
            userName: utils.req.headers["x-replit-user-name"],
            userRoles: utils.req.headers["x-replit-user-roles"],

            success: !!utils.req.headers["x-replit-user-id"],
        })
        
        return true
    }
}

const loginPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📦</text></svg>"
    />
    <title>Zero Framework Comments</title>

    <style>
        html, body {
            height: 100%;
            width: 100%;
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }

        *, ::before, ::after {
            box-sizing: inherit;
        }

        #app {
            height: 100vh;
            display: grid;
            place-items: center;
        }

        #app button {
            border-radius: 0.5rem;
            background-color: #ffce64;
            padding: 0.75rem 1rem;
            font-size: 1.125rem;
            border: none;
            cursor: pointer;
        }

        #app button:hover {
            background-color: #fec448;
        }
    </style>
</head>
<body>
    <div id="app">
        <script authed="exitWindow()" src="https://auth.util.repl.co/script.js"></script>
    </div>

    <script>
        const exitWindow = () => {
            window.close()
        }
    </script>
</body>
</html>
`