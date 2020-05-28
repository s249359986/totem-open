let env = 'online'
        if (location.host.indexOf('localhost') > -1) {
            env = 'local'
        }else{
            env = 'online'
        }    
    const apiDomain = {
        local: 'http://localhost:8003',
        online: ''
    }


export { apiDomain, env }