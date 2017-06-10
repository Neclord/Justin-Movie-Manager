/**
 * Class: List
 */
$(document).ready(function() {
	//button handling
	//this.element.on('click', '.workflowmanager-refresh-button',                                $.proxy(this.updateData,             this));
	//this.element.on('click', '.workflowmanager-filter-button',                                 $.proxy(this.showFilterPopup,        this));
	//this.element.on('click', '.workflowmanager-add-field-button',                              $.proxy(this.addField,               this));
	//this.element.on('click', '.workflowmanager-delete-field-button',                           $.proxy(this.deleteField,            this));

	// Initialize Table
	initListGrid();

	function initListGrid()
	{
		var listTable = $('.list-grid', this.element).dataTable({
			bDeferRender:      true,
			bJQueryUI:         true,
			bSortClasses:      false,
			bSort:             true,
			bFilter:           false,
			bAutoWidth:        true,
			sScrollY:          "480px",
			sScrollX:          "100%",
			bScrollCollapse:   true,
			sDom:              'TrtS',
			oTableTools: {sRowSelect: 'single', aButtons: []},
			aaData:            [],
			aoColumns: [
				{sTitle: 'movie_id',   sDataIndex: 'idmovies',   bVisible:  false},
				{sTitle: 'Title',      sDataIndex: 'title',      bSortable: true, sWidth: '250px', sClass: 'center'},
				{sTitle: 'Format',     sDataIndex: 'format',     bSortable: true, sWidth: '180px', sClass: 'center'},
				{sTitle: 'Length',     sDataIndex: 'length',     bSortable: true, sWidth: '100px', sClass: 'center'},
				{sTitle: 'Year',       sDataIndex: 'year',       bSortable: true, sWidth: '100px', sClass: 'center'},
				{sTitle: 'Rating',     sDataIndex: 'rating',     bSortable: true, sWidth: '100px', sClass: 'center'},
			]
		});

		$('.list-grid', this.element).data('listTable', listTable);

		getCollection();

		function createYesNoCell(nTd, sData, aData, iRow, iCol)
		{
			$(nTd).empty();

			if(sData == 't' || sData == 'True')
			{
				$(nTd).text('Yes');
			}
			else
			{
				$(nTd).text('No');
			}
		}
	}

	function getCollection()
	{
		var $table = $('.list-grid', this.element).data('listTable');
		$table.fnClearTable();

		$.ajax({
			type:    'get',
			url:     '../python/collection.py',
			context: this,
			success: function(response){
		        $table.fnAddData(response || []);

				//var tableData = $table.fnGetData();

				$table.fnDraw();
		    }
		});

		function loadData(result)
		{
			if (!result.success)
			{
				Utility.Notify.error('Workflow Manager', result.msg || 'Failed to get workflow data, please try again, if problem persists, please contact support.');
				return;
			}

			$table.fnAddData(data || []);

			//var tableData = $table.fnGetData();

			$table.fnDraw();
		}
	}
});