//Tự gọi các router tương ứng với các đường dẫn
(function (window) {
    //khai báo một object rỗng
    var $M = {};
    //mảng các router, trong các router sẽ chứa đường dẫn và `function` thực thi
    $M.RoutingList = [];
    //Kiểm tra trạng thái của các trang
    $M.currentPage = '';
    
    //Khai báo class `RoutingClass` và các thuộc tính
    var RoutingClass = function (u, f, t) {
        this.Params = u.split('/').filter(function(h){ return h.length > 0; });
        this.Url = u;
        this.Fn = f;
    
        this.Title = t;
    };
    
    
    //Hàm kiểm tra sẽ trả về 'false' hoặc url params
    //sẽ phân tích cú pháp url và tìm các tham số từ `location.href` 
    
    var checkParams = function (urlParams, routeParams) {
        console.log('urlParams')
        console.log(urlParams)
        console.log('routeParams')
        console.log(routeParams)
        var paramMatchCount = 0, paramObject = {};
    
        for(var i =0 ; i < urlParams.length ; i++){
            var rtParam = routeParams[i];
            if(rtParam.indexOf(':') >= 0){
                paramObject[rtParam.split(':')[1]] = urlParams[i];
                paramMatchCount += 1;
            }
        }
        console.log(paramObject)
        console.log(paramMatchCount)
        console.log(urlParams.length)
        if(paramMatchCount === urlParams.length){
            console.log('true')
            return paramObject;
        }
    
        return false;
    };
    
    
    //thực hiện 'function(s)' theo 'url' tương ứng
    //cùng với các tham số đã phân tích được
    //Ví dụ:
    //:     /:page/:pageid 
    //:     /home/3434434
    //giá trị page=>home và pageid=>3434434
    $M.loadController = function (urlToParse) {
        if($M.currentPage !== urlToParse) {
            console.log(urlToParse);
            $M.previousPage = $M.currentPage;
            $M.currentPage = urlToParse;
            var uParams = urlToParse.split('/').filter(function (h) {
                return h.length > 0;
            });
            console.log(uParams);
            var isRouteFound = 0;
            for (var i = 0; i < $M.RoutingList.length; i++) {
                var routeItem = $M.RoutingList[i];
                if (routeItem.Params.length === uParams.length) {
                    var _params = checkParams(uParams, routeItem.Params);
                    if (_params) {
                        _params.Title = routeItem.Title;
                        isRouteFound += 1;
                        routeItem.Fn.call(null, _params);
                    }
                }
            }
            console.log(`RoutItem `)
            console.log(routeItem)
        }else{
            console.log('you are on same page dude!!!!');
        }
    };
    
    
    //sử dụng chức năng pushSate của browser để điều hướng (thay đổi url)
    //và thực hiện các hàm tương ứng
    $M.navigateTo = function (navigateTo) {
        console.log(navigateTo)

        //window.history.pushState(null, null,'file:///D:/Code/WebPersonal/D_NodeJS/NodeJS_F8/src/frontend' + navigateTo);
        console.log(window.history)
        $M.loadController(navigateTo);
    };
    
    //thêm 'url' và 'function' vào routing list 
    $M.addRoute = function (urlToMatch, fnToExecute, t) {
        if(typeof urlToMatch === 'string'){
            console.log('type string')
            $M.RoutingList.push(new RoutingClass(urlToMatch, fnToExecute, t));
        }else if(typeof urlToMatch && urlToMatch instanceof Array){
            console.log('type array')
            urlToMatch.forEach(function (lItem) {
                $M.RoutingList.push(new RoutingClass(lItem, fnToExecute, t));
            });
            console.log($M.RoutingList)
        }
    
    };
    
    window.$NB = $M;
    })(window);
    