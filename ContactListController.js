({
    doInit : function(component, event, helper) {
        component.set("v.myColumns",[
            {label:"Name", fieldName:"Name", type:"text"},
            {label:"Title", fieldName:"Title", type:"text"},
            {label:"Department", fieldName:"Department", type:"text"}
        ]);
        var conAction = component.get("c.getContacts");
        conAction.setCallback(this, function(response){
            var state = response.getState();
            if(state == "SUCCESS"){
                var records = response.getReturnValue();
                component.set("v.allRecords", records);
                var pSize = component.get("v.pageSize");
                component.set("v.maxPage", Math.floor((records.length+pSize-1)/pSize));
                var pageSize = records.length;
                var paginationList = [];
                for(var i=0; i< pSize; i++)
                {
                    paginationList.push(records[i]);
                }
                component.set('v.paginationList', paginationList);
            }
        });
        $A.enqueueAction(conAction);
    },
    onSelectChange : function(component, event, helper) {
        var selected = component.find("pageSize").get("v.value");
        component.set("v.pageNumber", 1);
        component.set("v.pageSize", selected);
        var conList = component.get("v.allRecords");
        component.set("v.maxPage", Math.floor((conList.length+9)/selected));
        var paginationList = [];
        
        if(conList.length < selected){
            selected = conList.length;
        }
        for(var i=0; i< selected; i++)
        {
            paginationList.push(conList[i]);
        }
        component.set('v.paginationList', paginationList);
    },
    renderPage: function(component, event, helper) {
        var pSize = component.get("v.pageSize");
        var records = component.get("v.allRecords"),
            pageNumber = component.get("v.pageNumber"),
            pageRecords = records.slice((pageNumber-1)*pSize, pageNumber*pSize);
        component.set("v.paginationList", pageRecords);
    },
})
