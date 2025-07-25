sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'sap/sapcerafer/spacefarerlist/test/integration/FirstJourney',
		'sap/sapcerafer/spacefarerlist/test/integration/pages/SpacefarersList',
		'sap/sapcerafer/spacefarerlist/test/integration/pages/SpacefarersObjectPage'
    ],
    function(JourneyRunner, opaJourney, SpacefarersList, SpacefarersObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('sap/sapcerafer/spacefarerlist') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheSpacefarersList: SpacefarersList,
					onTheSpacefarersObjectPage: SpacefarersObjectPage
                }
            },
            opaJourney.run
        );
    }
);