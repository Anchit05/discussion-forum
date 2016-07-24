forumApp
    .directive('forumModal', function() {
        return {
            template: '<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog"'+ 
                'aria-labelledby="myLargeModalLabel" aria-hidden="true"><div class="modal-dialog modal-sm">'+
                '<div class="modal-content" ng-transclude><div class="modal-header"><button type="button"'+
                'class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>'+
                '</button><h4 class="modal-title" id="myModalLabel">Modal title</h4></div></div></div></div>', 
            restrict: 'E',
            transclude: true,
            replace:true,
            scope: {
                visible:'=',
                onShown:'&',
                onHide:'&'
            },   
            link: function(scope, element, attrs) {
                $(element).modal({
                    show: false, 
                    keyboard: attrs.keyboard, 
                    backdrop: attrs.backdrop
                });
                
                scope.$watch("visible", function(value) {
                    if(value === true) {
                        $(element).modal('show');
                    } else {
                        $(element).modal('hide');
                    }
                });
                
                $(element).on('shown.bs.modal', function(){
                  scope.$apply(function(){
                    scope.$parent[attrs.visible] = true;
                    scope.onShown({});
                  });
                });
                

                $(element).on('hidden.bs.modal', function(){
                  scope.$apply(function(){
                    scope.$parent[attrs.visible] = false;
                    scope.onHide({});
                  });
                });
                
            }
        };
    });

forumApp.directive('forumModalHeader', function(){
    return {
        template:'<div class="modal-header"><button type="button" class="close"'+
            'data-dismiss="modal" aria-label="Close"><span aria-hidden="true">'+
            '&times;</span></button><h4 class="modal-title">{{title}}</h4></div>',
        replace:true,
        restrict: 'E',
        scope: {
            title:'@'
        }
    };
});

forumApp.directive('forumModalBody', function(){
    return {
        template:'<div class="modal-body" ng-transclude></div>',
        replace:true,
        restrict: 'E',
        transclude: true
    };
});

forumApp.directive('forumModalFooter', function(){
    return {
        template:'<div class="modal-footer" ng-transclude></div>',
        replace:true,
        restrict: 'E',
        transclude: true
    };
});

