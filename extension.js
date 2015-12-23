/* Copyright (c) 2013-2015 The Tagspaces Authors. All rights reserved.
 * Use of this source code is governed by a AGPL3 license that 
 * can be found in the LICENSE file. */

define(function(require, exports, module) {
"use strict";
	
	console.log("Loading perspectiveGraph");

	var extensionTitle = "FolderViz";
	var extensionID = "perspectiveGraph";  // ID should be equal to the directory name where the ext. is located   
	var extensionType =  "perspective";
	var extensionIcon = "fa fa-sitemap";
	var extensionVersion = "1.0";
	var extensionManifestVersion = 1;
	var extensionLicense = "AGPL";

	var TSCORE = require("tscore");
	
	var $viewContainer;

	var extensionDirectory = TSCORE.Config.getExtensionPath()+"/"+extensionID;
	
	var graphMode = "mindmap"; 
	
	var treeData;
	
	exports.init = function init() {
		console.log("Initializing View "+extensionID);
		
    $viewContainer = $("#"+extensionID+"Container").empty();

    require([
      "text!" + extensionDirectory + '/toolbar.html',
     // "css!" + extensionDirectory + '/extension.css',
    ], function(toolbarTPL) {
      var toolbarTemplate = Handlebars.compile(toolbarTPL);
      $viewContainer.append(toolbarTemplate({ id: extensionID }));

      initUI();

      $('#' + extensionID + 'Container [data-i18n]').i18n();
    });
	};
	
	exports.load = function load() {
		console.log("Loading View "+extensionID);
    TSCORE.IO.createDirectoryTree(TSCORE.currentPath);
	};
	
	var reDraw = function() {
	  var $viewContainers = $("#viewContainers");
	  var height = $viewContainers.height() - 5;
	  var width = $viewContainers.width() - 5;
    switch (graphMode) {
      case "treeMap":
        require([
            extensionDirectory+'/treeViz.js',
            'css!'+extensionDirectory+'/styles.css',
            ], function(viz) {
                d3.select("svg").remove();
                var svg = d3.select("#"+extensionID+"Container")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);
                viz.drawTreeMap(svg, treeData);
                TSCORE.hideLoadingAnimation();
        });
        break;
      case "treeMap2":
        require([
            extensionDirectory+'/treeMap.js',
            'css!'+extensionDirectory+'/styles.css',
            ], function(viz) {
                d3.select("svg").remove();
                var svg = d3.select("#"+extensionID+"Container")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);
                viz.drawZoomableTreeMap(svg, treeData);
                TSCORE.hideLoadingAnimation();
        });
        break;
      case "tree":
        require([
            extensionDirectory+'/treeViz.js',
            'css!'+extensionDirectory+'/styles.css',
            ], function(viz) {
                d3.select("svg").remove();
                var svg = d3.select("#"+extensionID+"Container")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);
                viz.drawTree(svg, treeData);
                TSCORE.hideLoadingAnimation();
        });
        break;
      case "mindmap":
        require([
          extensionDirectory+'/mindmap.js',
          'css!'+extensionDirectory+'/mindmap.css',
          ], function(viz) {
            d3.select("svg").remove();
            var svg = d3.select("#"+extensionID+"Container")
              .append("svg")
              .attr("id", "tagspacesMindmap")
              .attr("width", width)
              .attr("height", height);
            viz.drawMindMap(svg, treeData);
            TSCORE.hideLoadingAnimation();
        });
        break;
      case "bilevelPartition":
        require([
          extensionDirectory+'/bilevelPartition.js',
          'css!'+extensionDirectory+'/styles.css',
          ], function(viz) {
            d3.select("svg").remove();
            var svg = d3.select("#"+extensionID+"Container")
                .append("svg")
                .attr("width", width)
                .attr("height", height);
            viz.drawPartition(svg, treeData);
            TSCORE.hideLoadingAnimation();
        });
        break;
      default:
        break;
    }
	};
	
	exports.updateTreeData = function updateIndexData(fsTreeData) {
		console.log("Updating tree data, Rendering graph...");
		
		treeData = fsTreeData;
		
		reDraw();
   
		TSCORE.hideLoadingAnimation(); 
	};
	
	var clearSelectedFiles = function() {
		console.log("clearSelectedFiles not implemented in "+extensionID);
	};
	
  var removeFileUI = function(filePath) {
    console.log("removeFileUI not implemented in "+extensionID);
  };

  var updateFileUI = function(oldFilePath, newFilePath) {
    console.log("updateFileUI not implemented in "+extensionID);
  };
    
	var getNextFile = function (filePath) {
		console.log("getNextFile not implemented in "+extensionID);
	};

	var getPrevFile = function (filePath) {
		console.log("getPrevFile not implemented in "+extensionID);
	};   
	
	var initUI = function() {

    $("#" + extensionID + "ActivateMindmapButton").click(function() {
      graphMode = "mindmap";
      TSCORE.showLoadingAnimation();
      TSCORE.IO.createDirectoryTree(TSCORE.currentPath);
    });

    $("#" + extensionID + "ActivateTreeMapButton").click(function() {
      graphMode = "treeMap";
      TSCORE.showLoadingAnimation();
      TSCORE.IO.createDirectoryTree(TSCORE.currentPath);
    });

    $("#" + extensionID + "ActivateTreeMapNaviButton").click(function() {
      graphMode = "treeMap2";
      TSCORE.showLoadingAnimation();
      TSCORE.IO.createDirectoryTree(TSCORE.currentPath);
    });

    $("#" + extensionID + "ActivateTreeButton").click(function() {
      graphMode = "tree";
      TSCORE.showLoadingAnimation();
      TSCORE.IO.createDirectoryTree(TSCORE.currentPath);
    });

    $("#" + extensionID + "ActivateBilevelPartitionButton").click(function() {
      graphMode = "bilevelPartition";
      TSCORE.showLoadingAnimation();
      TSCORE.IO.createDirectoryTree(TSCORE.currentPath);
    });
	};
	
  // Vars
  exports.Title = extensionTitle;
  exports.ID = extensionID;
  exports.Type = extensionType;
  exports.Icon = extensionIcon;
  exports.Version = extensionVersion;
  exports.ManifestVersion = extensionManifestVersion;
  exports.License = extensionLicense;
    
  // Methods
	exports.clearSelectedFiles = clearSelectedFiles;
	exports.getNextFile	= getNextFile;
	exports.getPrevFile = getPrevFile;
  exports.removeFileUI = removeFileUI;
  exports.updateFileUI = updateFileUI;
});