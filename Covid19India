public class CovidInfoCallOuts {
    @future(callout=true)
    public static void makeGetCallout() {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://xxx.xxxxxxx.org/xxxxx');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        // If the request is successful, parse the JSON response.
        if (response.getStatusCode() == 200) {
            // Deserializes the JSON string into collections of primitive data types.
            //Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            CovidJson jsonResult = ( CovidJson ) JSON.deserialize(response.getBody().replace('"date":', '"date_x":'), CovidJson.class );
            // Cast the values in the 'animals' key as a list
            List<CovidJson.Statewise> statewiseRes = jsonResult.statewise;
            List<Corona_Case__c> stateWiseCases = new List<Corona_Case__c>();
            System.debug('Covid Report By State in India:');
            for (CovidJson.Statewise s: statewiseRes) {
                Corona_Case__c c = new Corona_Case__c();
                c.State__c = s.state;
                c.State_Code__c = s.statecode;
                c.Confirmed__c = Integer.valueOf(s.confirmed);
                c.Active__c = Integer.valueOf(s.active);
                c.Recovered__c = Integer.valueOf(s.recovered);
                c.Deaths__c = Integer.valueOf(s.deaths);
                c.Today_New_Cases__c = Integer.valueOf(s.deltaconfirmed);
                c.Today_Recovered__c = Integer.valueOf(s.deltarecovered);
                c.Today_Deaths__c = Integer.valueOf(s.deltadeaths);
                c.Last_Updated_Time__c = DateTime.now();
                if(c.State_Code__c != 'TT'){
                    stateWiseCases.add(c);
                }
            }
            upsert stateWiseCases State__c;
            
            List<CovidJson.Cases_time_series> datewiseRes = jsonResult.cases_time_series;
            List<Daily_Cases__c> dailyCases = new List<Daily_Cases__c>();
            System.debug('Covid Report By Date in India:');
            for (CovidJson.Cases_time_series ct: datewiseRes) {
                Daily_Cases__c dc = new Daily_Cases__c();
                System.debug('date is: '+ct.date_x);
                System.debug('year is: '+System.Today().year());
                //dc.Name = ct.date1.trim()+''+System.Today().year();
                dc.Daily_Confirmed__c = Integer.valueOf(ct.dailyconfirmed);
                dc.Daily_Deceased__c = Integer.valueOf(ct.dailydeceased);
                dc.Daily_Recovered__c = Integer.valueOf(ct.dailyrecovered);
                dc.Total_Confirmed__c = Integer.valueOf(ct.totalconfirmed);
                dc.Total_Deceased__c = Integer.valueOf(ct.totaldeceased);
                dc.Total_Recovered__c = Integer.valueOf(ct.totalrecovered);
                String sDate = ct.date_x;
                dc.Status_Date__c = formattedDate(Integer.valueOf(sDate.split(' ').get(0)), sDate.split(' ').get(1), system.today().year());
                dc.Name = sDate.split(' ').get(0)+''+sDate.split(' ').get(1)+''+system.today().year();
                dailyCases.add(dc);
            }
            upsert dailyCases Name;
        }
        
    }
    public static date formattedDate(Integer day, String month, Integer year ){
        Integer mm;
        if(month == 'January'){
            mm = 1;
        }
        else if(month == 'February'){
            mm = 2;
        }
        else if(month == 'March'){
            mm = 3;
        }
        else if(month == 'April'){
            mm = 4;
        }
        else if(month == 'May'){
            mm = 5;
        }
        else if(month == 'June'){
            mm = 6;
        }
        else if(month == 'July'){
            mm = 7;
        }
        else if(month == 'August'){
            mm = 8;
        }
        else if(month == 'September'){
            mm = 9;
        }
        else if(month == 'October'){
            mm = 10;
        }
        else if(month == 'November'){
            mm = 11;
        }
        else if(month == 'December'){
            mm = 12;
        }
        Date myDate = Date.newInstance(year, mm, day);
        return myDate;
    }
}
