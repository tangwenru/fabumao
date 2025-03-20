```shell
    server {
            listen       80;
            listen       443 ssl;
            server_name  fafamao.com *.fafamao.com;

            server_tokens off;
 
            set $root_path  "/mnt/web/fafamao/www";
            root $root_path ;

            location ~* \.(txt|jpg|js|css)$ {
                        root $root_path;
                }

                 location / {
                 try_files $uri $uri/ /index.html;
                }

        }
```