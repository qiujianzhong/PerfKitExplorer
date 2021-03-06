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
 * @fileoverview Expose mock data for fieldCubeDataService.
 * @author joemu@google.com (Joe Allan Muharsky)
 */

goog.provide('p3rf.perfkit.explorer.mocks.fieldCubeDataServiceMock');


goog.scope(function() {
const explorer = p3rf.perfkit.explorer;

explorer.mocks.fieldCubeDataServiceMock = angular.module(
    'fieldCubeDataServiceMock', []);
const fieldCubeDataServiceMock = explorer.mocks.fieldCubeDataServiceMock;


fieldCubeDataServiceMock.value('fieldCubeDataServiceMockData',
    {
      data: function() {
        return [
          200,
          {
            data: ['Dashboard 1', 'Dashboard 2']
          }
        ];
      }
    });

}); // goog.scope
