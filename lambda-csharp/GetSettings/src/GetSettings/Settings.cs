using Amazon.Lambda.Core;
using System.Data;
using DBHelper;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace GetSettings
{

    public class Settings
    {
        /// <summary>
        /// Fecth All
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public static List<Setting>? FetchAll(ILambdaContext context)
        {
            try
            {
                string sqlString = @"
                                SELECT ID ,
	                            VERSION ,
	                            KEY ,
	                            NAME ,
	                            VALUE ,
	                            TO_CHAR(LAST_MODIFIED_AT,

		                            'YYYY-MM-DD""T""HH24:MI:SS""Z""') AS LAST_MODIFIED_AT ,
	                            TO_CHAR(CREATED_AT,

		                            'YYYY-MM-DD""T""HH24:MI:SS""Z""') AS CREATED_AT
                            FROM SETTING
                            ";
                DataTable? dt = DbHelper.GetDataTable(sqlString);

                if (dt != null)
                {
                    List<Setting> lst = Formatter.ConvertDataTable<Setting>(dt);
                    return lst;
                }

            }
            catch (Exception ex)
            {
            }
            return null;
        }
    }

}