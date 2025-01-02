/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/record', 'N/format', 'N/redirect'], function(serverWidget, record, format, redirect) {
    function onRequest(context) {
        if (context.request.method === 'GET') {
            var form = serverWidget.createForm({ title: 'Library Record' });

            form.addField({ label: 'Book Id', id: 'custpage_book_id', type: serverWidget.FieldType.INTEGER });
            form.addField({ label: 'Book Name', id: 'custpage_book_name', type: serverWidget.FieldType.TEXT });
            form.addField({ label: 'Issued By', id: 'custpage_issued_by', type: serverWidget.FieldType.TEXT });
            form.addField({ label: 'Name', id: 'custpage_name', type: serverWidget.FieldType.TEXT });
            form.addField({ label: 'Return Date', id: 'custpage_returndate', type: serverWidget.FieldType.DATE });

            form.addResetButton({ label: 'Reset Button' });
            form.addSubmitButton({ label: 'NewLibraryRecord' });

            form.clientScriptModulePath = 'SuiteScripts/AmitScripts/ClientScripts/bits_alert.js';

            context.response.writePage(form);
        } else {
            var bookid = context.request.parameters.custpage_book_id;
            var bookname = context.request.parameters.custpage_book_name;
            var issuedby = context.request.parameters.custpage_issued_by;
            var name = context.request.parameters.custpage_name;
            var returndate = context.request.parameters.custpage_returndate;

            var formatedreturndate = format.parse({ value: returndate, type: format.Type.DATE });

            var libraryrecord = record.create({ type: 'customrecord353', isDynamic: true });
            libraryrecord.setValue({ fieldId: 'custrecord_lrf_bookid', value: bookid });
            libraryrecord.setValue({ fieldId: 'name', value: name });
            libraryrecord.setValue({ fieldId: 'custrecord_lrf_bookname', value: bookname });
            libraryrecord.setValue({ fieldId: 'custrecord_lrf_issuedby', value: issuedby });
            libraryrecord.setValue({ fieldId: 'custrecord_lrf_returndate', value: formatedreturndate });

            libraryrecord.save();


            redirect.toSuitelet({
                scriptId: 'customscript863',
                deploymentId: 'customdeploy1'
            });
        }
    }

    return { onRequest: onRequest };
});
