/**
 * @copyright Copyright 2014 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @fileoverview DashboarDirective encapsulates HTML, style and behavior
 *     for displaying a dashboard.
 * @author joemu@google.com (Joe Allan Muharsky)
 */

goog.provide('p3rf.perfkit.explorer.components.dashboard.DashboardDirective');

goog.require('p3rf.perfkit.explorer.components.container.ContainerWidgetConfig');
goog.require('p3rf.perfkit.explorer.components.dashboard.DashboardService');
goog.require('p3rf.perfkit.explorer.models.ChartType');
goog.require('p3rf.perfkit.explorer.models.WidgetConfig');


goog.scope(function() {
const explorer = p3rf.perfkit.explorer;
const ChartType = explorer.models.ChartType;
const ContainerWidgetConfig = explorer.components.container.ContainerWidgetConfig;
const WidgetConfig = explorer.models.WidgetConfig;


/**
 * See module docstring for more information about purpose and usage.
 *
 * @return {Object} Directive definition object.
 * @constructor
 * @ngInject
 */
explorer.components.dashboard.DashboardDirective = function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      'ngModel': '='
    },
    templateUrl: '/static/components/dashboard/dashboard-directive.html',
    controller: [
        '$scope', 'explorerService', 'explorerStateService', 'dashboardService', 'containerService',
        'sidebarTabService', 'widgetFactoryService', 'widgetService',
        function($scope, explorerService, explorerStateService, dashboardService, containerService,
            sidebarTabService, widgetFactoryService, widgetService) {
      /** @export */
      $scope.containerSvc = containerService;

      /** @export */
      $scope.dashboardSvc = dashboardService;

      /** @export */
      $scope.explorerSvc = explorerService;

      /** @export */
      $scope.widgetFactorySvc = widgetFactoryService;

      /** @export */
      $scope.widgetSvc = widgetService;

      /** @export */
      $scope.clickRefreshWidget = function(event, widget) {
        dashboardService.refreshWidget(widget);
        event.stopPropagation();
      }

      /** @export */
      $scope.clickContainer = function(event, container) {
        dashboardService.selectWidget(null, container);
        event.stopPropagation();

        sidebarTabService.resolveSelectedTabForContainer();
      }

      /** @export */
      $scope.clickCopyAsImage = function(event, widget) {
        event.stopPropagation();

        widgetService.copyAsImage(widget);
      }

      /** @export */
      $scope.maximizeWidget = function(widget) {
        $scope.dashboardSvc.maximizeWidget(widget);
      }

      /** @export */
      $scope.getSelectedClass = function(container) {
        if (container.state().selected) {
          if (explorerStateService.widgets.selected) {
            return 'pk-container-selected-implicit';
          } else {
            return 'pk-container-selected';
          }
        }
        
        return '';
      }

      /** @export */
      $scope.removeWidget = function(event, widget, container) {
        event.stopPropagation();

        let msg = widgetService.getDeleteWarningMessage(widget);

        if (!window.confirm(msg)) {
          return;
        }

        dashboardService.removeWidget(widget, container);
      }

      /**
       * Returns true if the widget should scroll its overflow, otherwise stretch.
       * @param {!WidgetConfig} widget
       * @return {boolean}
       */
      $scope.isWidgetScrollable = function(widget) {
        return widgetService.isScrollable(widget);
      }

      /**
       * Returns the effective width of a widget within a container. 
       * @param {!WidgetConfig} widget
       * @param {!ContainerWidgetConfig} container
       * @return {number}
       * @export
       */
      $scope.getWidgetFlexWidth = function(widget, container) {
        let widgetSpan = widget.model.layout.columnspan;
        let totalSpan = container.model.container.columns;

        return Math.floor(widgetSpan / totalSpan * 100);
      }
    }]
  };
};

});  // goog.scope
