using System.Net;
using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;
using System.Data;
using DBHelper;

[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]


namespace DeleteSetting
{
    public class Settings
    {
        /// <summary>
        /// Delete a setting
        /// </summary>
        /// <param name="request"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public static APIGatewayHttpApiV2ProxyResponse Delete(APIGatewayProxyRequest request, ILambdaContext context)
        {
            try
            {
                if (request == null)
                    return new APIGatewayHttpApiV2ProxyResponse { StatusCode = (int)HttpStatusCode.BadRequest,
                        Body = "No request",
                        Headers = Formatter.Headers
                    };

                else
                {
                    if (request.PathParameters == null)
                        return new APIGatewayHttpApiV2ProxyResponse { StatusCode = (int)HttpStatusCode.BadRequest,
                            Body = "No Path Parameters",
                            Headers = Formatter.Headers
                        };

                    if (!request.PathParameters.TryGetValue("id", out var id))
                        return new APIGatewayHttpApiV2ProxyResponse { StatusCode = (int)HttpStatusCode.BadRequest,
                            Body = "Invalid Path Parameters",
                            Headers = Formatter.Headers
                        };

                    if (id == null)
                        return new APIGatewayHttpApiV2ProxyResponse { StatusCode = (int)HttpStatusCode.BadRequest,
                            Body = "Invalid Path Parameters",
                            Headers = Formatter.Headers
                        };

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
                            WHERE 
                                ID = " + id.ToString();

                    DataTable? dt = DbHelper.GetDataTable(sqlString);

                    if (dt == null || dt.Rows.Count == 0)
                    {
                        return new APIGatewayHttpApiV2ProxyResponse { StatusCode = (int)HttpStatusCode.NotFound,
                            Body = "No record found",
                            Headers = Formatter.Headers
                        };
                    }

                    sqlString = "DELETE FROM SETTING WHERE id = " + id.ToString();

                    if (DbHelper.ExecuteReader(sqlString.ToString()))
                        return new APIGatewayHttpApiV2ProxyResponse
                        {
                            StatusCode = (int)HttpStatusCode.NoContent,
                            Body = "Deleted",
                            Headers = Formatter.Headers
                        };
                    else
                        return new APIGatewayHttpApiV2ProxyResponse { StatusCode = (int)HttpStatusCode.BadRequest,
                            Body = "Error when deleting",
                            Headers = Formatter.Headers
                        };

                }

            }
            catch (Exception ex)
            {
                return new APIGatewayHttpApiV2ProxyResponse
                {
                    StatusCode = (int)HttpStatusCode.BadRequest,
                    Body = "Exception: " + ex.Message,
                    Headers = Formatter.Headers
                };
            }
        }
    }

}